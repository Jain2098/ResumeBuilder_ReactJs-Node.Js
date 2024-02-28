import { FaUserCircle, FaFilter  } from 'react-icons/fa';
import { FiAtSign } from "react-icons/fi";
import { IoSchoolSharp, IoCallSharp, IoSettingsSharp, IoClose } from "react-icons/io5";
import { IoLanguageSharp, IoShareSocialSharp} from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdFreeBreakfast } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { BiSolidHide } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { TbArrowMoveUp } from "react-icons/tb";
import { CgMoreO } from "react-icons/cg";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { LuGoal } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";




const appIcons = {
    address: <FaLocationDot />,
    zip: <FaLocationDot />,
    objective: <LuGoal />,
    keyHighlight: <FaStar />,
    personalInfo: <FaUserCircle />,
    education: <IoSchoolSharp />,
    link: <FiAtSign />,
    linkdin: <CiLinkedin />,
    github: <FaGithub />,
    contact: <IoCallSharp />,
    experience: <MdOutlineWork />,
    skills: <GiSkills />,
    languages: <IoLanguageSharp />,
    settings: <IoSettingsSharp />,
    email: <MdOutlineMarkEmailRead />,
    save: <FaSave />,
    share: <IoShareSocialSharp />,
    about: <FaInfoCircle />,
    delete: <FaTrash />,
    edit: <FaRegEdit />,
    hidden: <BiSolidHide />,
    visible: <IoMdEye />,
    moveUp: <TbArrowMoveUp />,
    more: <CgMoreO />,
    add: <FaPlus />,
    coffee: <MdFreeBreakfast />,
    cross: <IoClose />,
    filter: <FaFilter />,
}

export default appIcons;