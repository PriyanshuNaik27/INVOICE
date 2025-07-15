import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332b82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Full-stack developer with 5+ years of experience in React and Node.js",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
        email: "sarah@company.com"
      }
    },
    {
      name: "Michael Chen",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Creative designer focused on user-centered design and modern interfaces",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
        email: "michael@company.com"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Expert in API development and database optimization",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
        email: "emily@company.com"
      }
    },
    {
      name: "David Park",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Specialized in cloud infrastructure and deployment automation",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
        email: "david@company.com"
      }
    }
  ];

  return (
    <div className="team-section">
      <div className="team-header">
        <h2>Meet Our Team</h2>
        <p>The talented individuals behind your personal assistant</p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="member-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
              <div className="social-links">
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href={`mailto:${member.social.email}`}>
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
