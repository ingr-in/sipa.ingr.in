// rinku.js - Fixed
export const SOCIAL_CONFIG = {
  urlPatterns: {
    youtube: (u) => `https://youtube.com/@${u}`,
    instagram: (u) => `https://instagram.com/${u}`,
    facebook: (u) => `https://facebook.com/${u}`,
    facebookPage: (u) => `https://www.facebook.com/profile.php?id=${u}`,
    twitter: (u) => `https://twitter.com/${u}`,
    linkedin: (u) => `https://linkedin.com/in/${u}`,
    github: (u) => `https://github.com/${u}`
  },
  displayNames: {
    youtube: 'YouTube',
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    github: 'GitHub'
  },
  icon: {  // Fixed: Changed '=' to ':'
    youtube: "fa-brands fa-youtube",
    instagram: "fa-brands fa-instagram",
    facebook: "fa-brands fa-facebook",
    twitter: "fa-brands fa-x-twitter",
    linkedin: "fa-brands fa-linkedin",
    github: "fa-brands fa-github"
  }
};