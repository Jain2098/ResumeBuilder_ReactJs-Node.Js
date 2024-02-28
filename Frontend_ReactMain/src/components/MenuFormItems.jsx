import { v4 as generateId } from "uuid";
import appIcons from "./icons/appIconsBarrel";

const tabs = [
    {
      title: "Personal Information",
      icon: appIcons.personalInfo,
      id: generateId(),
    },
    {
      title: "Objective",
      icon: appIcons.objective,
      id: generateId(),
    },
    {
      title: "Key Highlights",
      icon: appIcons.keyHighlight,
      id: generateId(),
    },
    {
      title: "Education",
      icon: appIcons.education,
      id: generateId(),
    },
    {
      title: "Work Experience",
      icon: appIcons.experience,
      id: generateId(),
    },
    {
      title: "Projects",
      icon: appIcons.skills,
      id: generateId(),
    },
    // {
    //   title: "Languages",
    //   icon: appIcons.languages,
    //   id: generateId(),
    // },
    // {
    //   title: "Settings",
    //   icon: appIcons.settings,
    //   id: generateId(),
    // },
    // {
    //   title: "Save/Submit",
    //   icon: appIcons.save,
    //   id: generateId(),
    // },
    {
      title: "About",
      icon: appIcons.about,
      id: generateId(),
    },
  ];

  export {tabs};