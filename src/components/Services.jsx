import React from 'react'
import assets from '../assets/assets'
import Title from './Title'
import ServicesCard from './ServicesCard'
import { motion } from "framer-motion";

const Services = () => {

    const servicesData = [
        {
            title: 'المنيو الالكتروني',
            description: 'حوّل قائمة طعامك إلى تجربة رقمية تفاعلية تزيد من سرعة الطلب وتقلل أخطاء التشغيل',
            icon: assets.ads_icon
        },
        {
            title: 'تصميم جرافيك وهويه بصريه',
            description: 'الانطباع الأول يدوم؛ التصميم الاحترافي يبني الثقة فوراً ويجعل علامتك التجارية الخيار الأول في ذهنه',
            icon: assets.marketing_icon
        },
        {
            title: 'المواقع الإلكترونية',
            description: 'نحول فكرتك إلى منصة رقمية متكاملة تجمع بين التصميم العصري والأداء السريع لتضمن لمشروعك حضوراً قوياً لا ينسى , ',
            icon: assets.content_icon
        },
        {
            title: 'إدارة الحملات الإعلانية الممولة',
            description: 'استهداف ذكي: بنوصل لعميلك حسب اهتماماته، مكانه، وسنه ',
            icon: assets.social_icon
        },
         {
            title: 'إنتاج فيديوهات بالذكاء الاصطناعي',
            description: 'تقدر تعمل فيديو احترافي ومبهر في وقت قياسي من غير ما تحتاج استوديو تصوير ضخم وممثلين في كل مرة',
            icon: assets.ai_video
        },
        {
            title: 'اداره وسائل التواصل الاجتماعي',
            description: 'اداره كامله لصفحتك بمحتوي احترافي يجذب المتابعين ويحولهم الي عملاء',
            icon: assets.Social_media
        },
         
         
        
    ]

  return (
    <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{once: true}}
    transition={{staggerChildren: 0.2}}
    
    id='services' className='relative  flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
      <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 z-1 dark:hidden' />

      <div className="z-10">
        <Title title='..ممكن نعمل ايه عشانك' desc='من الاستراتيجيه الي التصميم , نصمم لك حلولا رقميه تدفع اعمالك الي الامام' />
      </div>
      <div className="flex flex-col md:grid grid-cols-2">
        {servicesData.map((service, index)=>(
            <ServicesCard key={index} service={service} index={index}/>
        ))}
      </div>
    </motion.div>
  )
}

export default Services
