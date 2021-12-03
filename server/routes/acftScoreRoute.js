
import {
    maxDeadLift,
    standingPowerThrow,
    hrPushups,
    legTuck,
    sprintDragCarry,
    plank,
    twoMileRun,
} from '../util/acftScores';

const cache = {};

const scoreObj = {maxDeadLift, standingPowerThrow, hrPushups, legTuck, sprintDragCarry, plank,twoMileRun};

export const scoreRoute = {
    path:'/api/score',
    method:'post',
    handler: async (req, res) => {

        let n = Object.values(req.body).join('-');
        n = n.replace(/:/g, '');

        const generateScore = ({mdl, spt,hrp,ltk,sdc,plk,run}) => {
            let result = {};
            const findScore = ({ str, value, increment }) => {

                if (
                    (str === 'maxDeadLift' && value < 80) ||
                    (str === 'standingPowerThrow' && value < 3.3) ||
                    (str === 'hrPushups' && value < 1)
                ) {
                    return { score: 0, outcome: 'fail'};
                } else {
                    while (scoreObj[str][value.toString()] == undefined) {
                        value = Number(value) - increment;
                    }
                    let score = scoreObj[str][value];
                    let outcome = score >= 60 ? 'pass' : 'fail';
                    return {score, outcome};
                }
            };
        
            result.mdl = findScore({str:'maxDeadLift', value: mdl, increment: 1});
            result.spt = findScore({str:'standingPowerThrow', value:spt, increment: .1 });
            result.hrp = findScore({str:'hrPushups',value:hrp, increment: 1 });
            result.ltk = findScore({str:'legTuck', value:ltk, increment: 1});


            const getTimeScore = ({name, val}) => {
                val = val.split(':').map(i => parseInt(i, 10));
                val = val.join('-');

                while (scoreObj[name][val] === undefined) {
                    val = val.split('-').map(i => parseInt(i, 10));
                    if ((name === 'sprintDragCarry' && val[1] >= 3 && val[2] >= 35) ||
                        (name === 'plank' && val[1] <= 2 && val[2] <= 3) ||
                        (name === 'twoMileRun' && val[1] >= 22 && val[2] >= 48)) {
                        return { score: 0, outcome: 'fail'};
                    }

                    //increment/decrement seconds and minutes
                    if (name !== 'plank') {
                        if (val[2] === 59) {
                            val[1] = val[1] + 1;
                            val[2] = 0;
                        } else {
                            val[2] = val[2] + 1;
                        }
                    } else {
                        if (val[2] === 0) {
                            val[2] = 59;
                            val[1] = val[1] - 1;
                        } else {
                            val[2] = val[2] - 1;
                        }
                    }

                    val = val.join('-');
                }

                let score = scoreObj[name][val];
                let outcome = score >= 60 ? 'pass' :'fail';
                return {score, outcome};
            };
            
            result.sdc = getTimeScore({name:'sprintDragCarry', val:sdc});
            result.plk = getTimeScore({name:'plank', val:plk });
            result.run = getTimeScore({name:'twoMileRun', val:run});

            let total = 0;
            let outcome = 'pass';
            for (let key in result) {
                if (result[key]['score'] < 60) {
                    outcome = 'fail';
                }
                total += result[key]['score'];
            }

            result.total = total;
            result.outcome = outcome;


            console.log('total result', result);
            return result;
        };

        //console.log('n', n);
        if (n in cache) {
            console.log('Fetching from cache');
            res.status(200).json(cache[n]);
        } else {
            console.log('Calculating ACFT Score', JSON.stringify(req.body));
            try {
                const result = generateScore(req.body);
                cache[n] = result;
                res.status(200).json(result);
            } catch(error) {
                res.status(500).json({error});
            }
        }
    }
}
