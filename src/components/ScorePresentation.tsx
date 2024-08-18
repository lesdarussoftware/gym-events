/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import { EventParticipant } from '../server/db';

import { getTotal } from '../helpers/utils';

type Props = {
    formData: EventParticipant,
    onClose: any
}

export function ScorePresentation({ formData, onClose }: Props) {

    useEffect(() => {
        const handleKeyPress = (event: { key: string; }) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onClose]);

    return (
        <>
            <div className="fullscreen-container">
                <h3>{`${formData.participant.first_name} ${formData.participant.last_name}`}</h3>
                <div className='score-container'>
                    <motion.div
                        className="score-card"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Salto {formData.salto_note}
                    </motion.div>
                    <motion.div
                        className="score-card"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Paralelas {formData.paralelas_note}
                    </motion.div>
                    <motion.div
                        className="score-card"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Viga {formData.viga_note}
                    </motion.div>
                    <motion.div
                        className="score-card"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Suelo {formData.suelo_note}
                    </motion.div>
                    <motion.div
                        className="score-card"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        Total {getTotal(formData)}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
