import React, { useRef, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import raghuImage from './pics/raghuBhaiya.jpg';
import ayushImage from './pics/ayush.jpg';
import abhishekImage from './pics/aj.png';
import priyanshuImage from './pics/priyanshu.jpg';

const Team = ({ setActiveTab }) => {
  const swiperRef = useRef(null);

  const teamMembers = [
    {
      name: "Raghu Kanchustambham",
      role: "Founder/CEO, ConceptWaves Software Solutions",
      image: raghuImage,
      bio: "Raghu, an IIT Guwahati alumnus, founded ConceptWaves in 2006 after working at Hughes and IBM. His platform EduSquares manages the complete student lifecycle for school..",
      social: {
        linkedin: "https://www.linkedin.com/in/raghukanchu/",
        email: "raghu@conceptwaves.com"
      },
      duration: 3000
    },
    {
      name: "Ayush Waghmare",
      role: "Full Stack Developer",
      image: ayushImage,
      bio: "Ayush is a Full Stack Developer with a passion for building scalable web applications. He has experience in both frontend and backend technologies, making him a versatile asset to the team.",
      social: {
        linkedin: "https://www.linkedin.com/in/ayush-waghmare-28a7912a2/",
        github: "https://github.com/AyushWaghmare019",
        email: "ayushwaghmare119@gmail.com"
      },
      duration: 4200
    },
    {
      name: "Abhishek Kumar Jha",
      role: "Full Stack Developer",
      image: abhishekImage,
      bio: "Abhishek is a Full Stack Developer with expertise in building robust web applications. He is skilled in both frontend and backend development, ensuring seamless user experiences.",
      social: {
        linkedin: "https://www.linkedin.com/in/abhishek-kumar-jha-776a592b1/",
        github: "https://github.com/abhishekjhaji2004",
        email: "abhishekjhaji2004@gmail.com"
      },
      duration: 3000
    },
    {
      name: "Priyanshu Naik",
      role: "Full Stack Developer",
      image: priyanshuImage,
      bio: "Priyanshu is a Full Stack Developer with a keen interest in creating dynamic web applications. His skills span across various technologies, allowing him to contribute effectively to both frontend and backend development.",
      social: {
        linkedin: "https://www.linkedin.com/in/priyanshu-naik-787bb72a2/",
        github: "https://github.com/PriyanshuNaik27?tab=repositories",
        email: "priyanshunaik26@gmail.com"
      },
      duration: 3000
    }
  ];

  const slidesToRender = teamMembers.length < 5
    ? [...teamMembers, ...teamMembers]
    : teamMembers;

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    swiper.slideToLoop(0, 0);

    swiper.on('slideChange', () => {
      const currentSlide = swiper.realIndex;
      const delay = slidesToRender[currentSlide].duration;
      swiper.params.autoplay.delay = delay;
      swiper.autoplay?.start();
    });
  }, [slidesToRender]);

  return (
    <div className="team-section px-4 py-10 max-w-7xl mx-auto">
      <div className="team-header text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Meet Our Team</h2>
        <p className="text-gray-400">The talented individuals behind INVOICER</p>
      </div>

      <div className="team-carousel-container">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectCoverflow]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={0}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          className="max-w-5xl mx-auto"
          style={{ paddingBottom: "50px" }}
          onSwiper={(swiper) => {
            const container = swiper.el;
            container.addEventListener('mouseover', () => {
              swiper.autoplay?.stop();
            });
            container.addEventListener('mousemove', (e) => {
              const { left, width } = container.getBoundingClientRect();
              const x = e.clientX - left;
              const percentage = x / width;
              const slideIndex = Math.floor(percentage * slidesToRender.length);
              swiper.slideToLoop(slideIndex);
            });
            container.addEventListener('mouseleave', () => {
              swiper.autoplay?.start();
            });
          }}
        >
          {slidesToRender.map((member, index) => (
            <SwiperSlide key={index} style={{ width: "320px" }}>
              <div className="team-card-carousel bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-48 bg-black flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-image-carousel w-full h-full object-contain"
                  />
                </div>
                <div className="member-info-carousel p-4">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="role text-green-400 mb-2">{member.role}</p>
                  <p className="bio text-sm text-gray-300 mb-3">{member.bio}</p>
                  <div className="social-links flex space-x-3 mt-2">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin size={20} />
                    </a>
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub size={20} />
                      </a>
                    )}
                    <a href={`mailto:${member.social.email}`}>
                      <FaEnvelope size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
//
export default Team;
