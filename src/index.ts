import express, { Request, Response, NextFunction } from 'express';
import knex, { Knex } from 'knex';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { EventEmitter } from 'events';
import dbConfig from './config/knexfile';

const app = express();
const port = 4000;

interface Stats {
    totalUsers: number;
    totalBets: number;
    totalEvents: number;
}

interface User {
    id: string;
    type: string;
    email: string;
    phone: string;
    name: string;
    city?: string;
    balance?: number;
    created_at?: string;
    updated_at?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface EventData {
    id: string;
    type: string;
    home_team: string;
    away_team: string;
    start_at: Date;
    odds_id?: string;
}

interface BetData {
    id: string;
    event_id: string;
    bet_amount: number;
    prediction: string;
    user_id: string;
    multiplier?: number;
}

const statEmitter = new EventEmitter();
const stats: Stats = {
    totalUsers: 3,
    totalBets: 1,
    totalEvents: 1,
};

let db: Knex;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    db = knex(dbConfig.development);
    db.raw('select 1+1 as result').then(() => {
        next();
    }).catch(() => {
        throw new Error('No db connection');
    });
});

app.get('/health', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/users/:id', (req: Request, res: Response) => {
    try {
        const schema = joi.object({
            id: joi.string().uuid().required(),
        });
        const isValidResult = schema.validate(req.params);
        if (isValidResult.error) {
            res.status(400).send({ error: isValidResult.error.details[0].message });
            return;
        }
        db('user').where('id', req.params.id).returning('*').then(([result]) => {
            if (!result) {
                res.status(404).send({ error: 'User not found' });
                return;
            }
            res.send({
                ...result,
                createdAt: result.created_at,
                updatedAt: result.updated_at,
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/users', (req: Request, res: Response) => {
    const schema = joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/).required(),
        name: joi.string().required(),
        city: joi.string(),
    }).required();

    const isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    }

    req.body.balance = 0;
    db<User>('user').insert(req.body).returning('*').then(([result]) => {
        result.createdAt = result.created_at;
        delete result.created_at;
        result.updatedAt = result.updated_at;
        delete result.updated_at;
        statEmitter.emit('newUser');
        res.send({
            ...result,
            accessToken: jwt.sign({ id: result.id, type: result.type }, process.env.JWT_SECRET || 'default_secret')
        });
    }).catch(err => {
        if (err.code === '23505') {
            res.status(400).send({ error: err.detail });
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

app.put('/users/:id', (req: Request, res: Response) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    token = token.replace('Bearer ', '');
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string; type: string };
    } catch (err) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    const schema = joi.object({
        email: joi.string().email(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
        name: joi.string(),
        city: joi.string(),
    }).required();

    const isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    }

    if (req.params.id !== tokenPayload.id) {
        return res.status(401).send({ error: 'UserId mismatch' });
    }

    db('user').where('id', req.params.id).update(req.body).returning('*').then(([result]) => {
        res.send({
            ...result,
            createdAt: result.created_at,
            updatedAt: result.updated_at,
        });
    }).catch(err => {
        if (err.code === '23505') {
            res.status(400).send({ error: err.detail });
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/transactions', (req: Request, res: Response) => {
    const schema = joi.object({
        id: joi.string().uuid(),
        userId: joi.string().uuid().required(),
        cardNumber: joi.string().required(),
        amount: joi.number().min(0).required(),
    }).required();

    const isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    }

    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    token = token.replace('Bearer ', '');
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string; type: string };
        if (tokenPayload.type !== 'admin') {
            throw new Error();
        }
    } catch (err) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    db<User>('user').where('id', req.body.userId).then(([user]) => {
        if (!user) {
            res.status(400).send({ error: 'User does not exist' });
            return;
        }

        const transactionData = {
            id: req.body.id,
            user_id: req.body.userId,
            card_number: req.body.cardNumber,
            amount: req.body.amount,
        };

        db('transaction').insert(transactionData).returning('*').then(([result]) => {
            const currentBalance = req.body.amount + user.balance!;
            db('user').where('id', req.body.userId).update('balance', currentBalance).then(() => {
                const response = {
                    ...result,
                    userId: result.user_id,
                    cardNumber: result.card_number,
                    createdAt: result.created_at,
                    updatedAt: result.updated_at,
                    currentBalance,
                };
                delete response.user_id;
                delete response.card_number;
                delete response.created_at;
                delete response.updated_at;
                res.send(response);
            });
        });
    }).catch(err => {
        res.status(500).send('Internal Server Error');
    });
});

app.post('/events', (req: Request, res: Response) => {
    const schema = joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        homeTeam: joi.string().required(),
        awayTeam: joi.string().required(),
        startAt: joi.date().required(),
        odds: joi.object({
            homeWin: joi.number().min(1.01).required(),
            awayWin: joi.number().min(1.01).required(),
            draw: joi.number().min(1.01).required(),
        }).required(),
    }).required();

    const isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    }

    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    token = token.replace('Bearer ', '');
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string; type: string };
        if (tokenPayload.type !== 'admin') {
            throw new Error();
        }
    } catch (err) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    const eventData: EventData = {
        id: req.body.id,
        type: req.body.type,
        home_team: req.body.homeTeam,
        away_team: req.body.awayTeam,
        start_at: req.body.startAt,
    };

    db.transaction(trx => {
        return trx('odds').insert({
            home_win: req.body.odds.homeWin,
            away_win: req.body.odds.awayWin,
            draw: req.body.odds.draw
        }).returning('*').then(([odds]) => {
            eventData.odds_id = odds.id;
            return trx('event').insert(eventData).returning('*').then(([event]) => {
                statEmitter.emit('newEvent');
                const response = {
                    ...event,
                    odds: {
                        id: odds.id,
                        homeWin: odds.home_win,
                        awayWin: odds.away_win,
                        draw: odds.draw,
                        createdAt: odds.created_at,
                        updatedAt: odds.updated_at,
                    }
                };
                res.status(200).send({
                    id: event.id,
                    type: event.type,
                    homeTeam: event.home_team,
                    awayTeam: event.away_team,
                    startAt: event.start_at,
                    createdAt: event.created_at,
                    updatedAt: event.updated_at,
                    oddsId: event.odds_id,
                    odds: response.odds,
                    score: event.score
                });
            });
        }).catch(err => {
            console.error('Transaction error:', err);
            throw err;
        });
    }).catch(err => {
        res.status(500).send('Internal Server Error');
    });
});

app.post('/bets', (req: Request, res: Response) => {
    const schema = joi.object({
        id: joi.string().uuid(),
        eventId: joi.string().uuid().required(),
        betAmount: joi.number().min(1).required(),
        prediction: joi.string().valid('w1', 'w2', 'x').required(),
    }).required();

    const isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    }

    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    token = token.replace('Bearer ', '');
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string };
    } catch (err) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    const betData: BetData = {
        id: req.body.id,
        event_id: req.body.eventId,
        bet_amount: req.body.betAmount,
        prediction: req.body.prediction,
        user_id: tokenPayload.id,
    };

    db('user').where('id', tokenPayload.id).then(([user]) => {
        if (!user) {
            res.status(400).send({ error: 'User does not exist' });
            return;
        }
        if (user.balance < req.body.betAmount) {
            res.status(400).send({ error: 'Not enough balance' });
            return;
        }
        db('event').where('id', req.body.eventId).then(([event]) => {
            if (!event) {
                res.status(404).send({ error: 'Event not found' });
                return;
            }
            db('odds').where('id', event.odds_id).then(([odds]) => {
                if (!odds) {
                    res.status(404).send({ error: 'Odds not found' });
                    return;
                }
                let multiplier;
                switch (req.body.prediction) {
                    case 'w1':
                        multiplier = odds.home_win;
                        break;
                    case 'w2':
                        multiplier = odds.away_win;
                        break;
                    case 'x':
                        multiplier = odds.draw;
                        break;
                    default:
                        res.status(400).send({ error: 'Invalid prediction' });
                        return;
                }
                betData.multiplier = multiplier;
                db('bet').insert(betData).returning('*').then(([bet]) => {
                    const currentBalance = user.balance - req.body.betAmount;
                    db('user').where('id', tokenPayload.id).update('balance', currentBalance).then(() => {
                        statEmitter.emit('newBet');
                        res.send({
                            ...bet,
                            currentBalance,
                            eventId: bet.event_id,
                            betAmount: bet.bet_amount,
                            createdAt: bet.created_at,
                            updatedAt: bet.updated_at,
                            userId: bet.user_id,
                        });
                    });
                });
            });
        });
    }).catch(err => {
        res.status(500).send('Internal Server Error');
    });
});

app.put('/events/:id', (req: Request, res: Response) => {
    const schema = joi.object({
        score: joi.string().required(),
    }).required();

    const isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    }

    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    token = token.replace('Bearer ', '');
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string; type: string };
        if (tokenPayload.type !== 'admin') {
            throw new Error();
        }
    } catch (err) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    const eventId = req.params.id;
    db('bet').where('event_id', eventId).andWhere('win', null).then((bets) => {
        const [w1, w2] = req.body.score.split(':').map(Number);
        let result;
        if (w1 > w2) {
            result = 'w1';
        } else if (w2 > w1) {
            result = 'w2';
        } else {
            result = 'x';
        }
        db('event').where('id', eventId).update({ score: req.body.score }).returning('*').then(([event]) => {
            Promise.all(bets.map((bet) => {
                if (bet.prediction === result) {
                    return db('bet').where('id', bet.id).update({ win: true }).then(() => {
                        return db('user').where('id', bet.user_id).then(([user]) => {
                            return db('user').where('id', bet.user_id).update({
                                balance: user.balance + (bet.bet_amount * bet.multiplier),
                            });
                        });
                    });
                } else {
                    return db('bet').where('id', bet.id).update({ win: false });
                }
            })).then(() => {
                res.send({
                    ...event,
                    awayTeam: event.away_team,
                    homeTeam: event.home_team,
                    oddsId: event.odds_id,
                    startAt: event.start_at,
                    createdAt: event.created_at,
                    updatedAt: event.updated_at,
                });
            });
        });
    }).catch(err => {
        res.status(500).send('Internal Server Error');
    });
});

app.get('/stats', (req: Request, res: Response) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    token = token.replace('Bearer ', '');
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string; type: string };
        if (tokenPayload.type !== 'admin') {
            throw new Error();
        }
    } catch (err) {
        return res.status(401).send({ error: 'Not Authorized' });
    }

    res.send({
        totalUsers: stats.totalUsers,
        totalBets: stats.totalBets,
        totalEvents: stats.totalEvents,
    });
});

const server = app.listen(port, () => {
    statEmitter.on('newUser', () => {
        stats.totalUsers++;
    });
    statEmitter.on('newBet', () => {
        stats.totalBets++;
    });
    statEmitter.on('newEvent', () => {
        stats.totalEvents++;
    });

    console.log(`App listening at http://localhost:${port}`);
});

export { app, server };