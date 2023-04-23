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
        There has always been a struggle in computer science education at <span className= "font-extrabold text-white">Stuyvesant</span> , regardless of the countless approaches teachers have taken to aid students. Resources, such as CSDojo, CodingBat, and static presentations have time and time again proven to be inadequate to help complete beginners feel comfortable with course topics. Even introductory courses such as “Intro to CS" have caused beginners to struggle, scaring them away from future CS courses/careers. As the forefront of technology, it's crucial that current and future CS students excel in the field. This is where SimplifyCS comes in.
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
