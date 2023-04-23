'use client';

import { motion } from 'framer-motion';

import styles from '../styles.js';
import { navVariants } from '../utils/motion.js';
import { useRouter } from 'next/router.js';

const Navbar = () => {
  const router = useRouter();

  return (
    <motion.nav
      variants = {navVariants}
      initial = "hidden"
      whileInView="show"
      className = {`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01"/>
      <div className = {`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
        <img
          src = "/menu.svg"
          alt = "menu"
          className = "w-[24px] h-[24px] object-contain"
        />
      
        <h2 className = "font-extrabold text-[24px] leading-[30px] text-white">
          simplifycs
        </h2>
        <h2 style={{ cursor: "pointer" }} className = "font-normal text-[24px] leading-[30px] text-white" onClick={() => { router.push("/login")}}>
          sign in
        </h2>
      </div>
    </motion.nav>
  )
};

export default Navbar;
