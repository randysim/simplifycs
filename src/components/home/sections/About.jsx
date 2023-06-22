'use client';

import { motion } from 'framer-motion';
import {TypingText} from "../components";

import styles from '../styles.js';
import { fadeIn, staggerContainer} from '../utils/motion';

const About = () => (
  <section className= {`${styles.paddings} relative z-10`}>
    <div className = "gradient-02 z-0"/>
    <motion.div
      variants = {staggerContainer}
      initial= "hidden"
      whileInView="show"
      viewport={{once:false, amount:0.25}}
      className = {`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About simplifycs" textStyles="text-center"/>

      <motion.p
        variants = {fadeIn('up', 'tween', 0.2, 1)}
        className = "mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Despite the countless approaches teachers take to aid students, there has always been a struggle in computer science education, even at <span className= "font-extrabold text-white">Stuyvesant</span>. Resources, such as CodingBat, static presentations, or csDojo, although helpful to many, leave some complete beginners lacking confidence with course topics. At the forefront of technology, it is crucial that current and future CS students excel in the field, so we need to make it a priority to provide resources that may help students struggling in computer science courses. This is where SimplifyCS comes in.
      </motion.p>
      <motion.img
        variants = {fadeIn('up', 'tween', 0.3, 1)}
        src = "/arrow-down.svg"
        alt = "arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
