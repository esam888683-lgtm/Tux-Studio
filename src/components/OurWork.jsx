import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import { motion } from "framer-motion";
import halalVideo from '../assets/halal.mp4';

const OurWork = () => {
  const workData = [
    {
      title: "تصميمات الجرافيك",
      description:
        "تميز بصري , تصاميم بوستات مدروسة نفسياً عشان تجيب لايكات ومبيعات",
      image: assets.work_mobile_app,
    },
    {
      title: "المينيو الذكي",
      description:
        "السرعة هي الأساس؛ بيشوف، بيختار، وبيطلب.. كله من موبايله الشخصي",
      image: assets.work_dashboard_management,
    },
    {
      title: "متجر الكتروني",
      description:
        "حوّل مشروعك إلى براند عالمي بمتجر إلكتروني يبيع لك وأنت نائم، بتجربة تسوق تجعل عملائك يعودون دائماً",
      image: assets.work_fitness_app,
    },
    
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="our-work"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="احدث اعمالنا"
        desc="تصفح اعمالنا من المشاريع الرقميه المبتكرة التي تعرض الابداع والاداء والنتائج"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {workData.map((work, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            key={index}
            className="hover:scale-102 duration-500 transition-all cursor-pointer"
          >
            <img src={work.image} className="w-full rounded-xl" alt="" />
            <h3 className="mt-3 mb-2 text-lg font-semibold">{work.title}</h3>
            <p className="text-sm opacity-60 w-5/6">{work.description}</p>
            <button className="relative px-8 py-3 font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#B22222] to-[#FF4500] rounded-full hover:shadow-[0_0_20px_rgba(255,69,0,0.6)] hover:scale-105 active:scale-95 group overflow-hidden">
                    <a target="_blank" href="https://wa.me/message/SJIDZYU2V2MTK1" className="relative z-10">ابدأ مشروعك الآن</a> 
              </button>
          </motion.div>
        ))}
      </div>
      <video type="video/mp4" src={halalVideo} className="w-full rounded-xl" autoPlay muted loop playsInline></video>
            <h3 className="mt-3 mb-2 text-lg font-semibold">فيديو احترافي</h3>
            <p className="text-sm opacity-60 w-5/6">جودة إنتاج عالمية دون الحاجة لاستوديو تصوير ضخم. فيديوهاتنا تمنحك فخامة الإخراج السينمائي بتكلفة ذكية وسرعة تنفيذ مذهلة</p>
            <button className="relative px-8 py-3 font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#B22222] to-[#FF4500] rounded-full hover:shadow-[0_0_20px_rgba(255,69,0,0.6)] hover:scale-105 active:scale-95 group overflow-hidden">
                    <a target="_blank" href="https://wa.me/message/SJIDZYU2V2MTK1" className="relative z-10">ابدأ مشروعك الآن</a> 
              </button>

    </motion.div>
  );
};

export default OurWork;
