import { IconType } from "react-icons";
import {
  AiFillCaretLeft,
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlineCopy,
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineUpload,
} from "react-icons/ai";
import {
  BsDiscord,
  BsExclamationCircle,
  BsEye,
  BsEyeSlash,
  BsFacebook,
  BsFillBrightnessHighFill,
  BsFillMoonFill,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { CgUndo } from "react-icons/cg";
import {
  FaEthereum,
  FaExternalLinkAlt,
  FaGithub,
  FaTelegramPlane,
  FaUserCircle,
} from "react-icons/fa";
import { FiEdit, FiMenu } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";
import { HiOutlineClipboard, HiOutlineSearch } from "react-icons/hi";
import {
  IoChevronBackCircleOutline,
  IoClose,
  IoWalletSharp,
  IoWarning,
} from "react-icons/io5";
import { IconBaseProps } from "react-icons/lib";
import { RiLoader5Fill } from "react-icons/ri";
import { SiGitbook, SiHiveBlockchain } from "react-icons/si";
import { VscLoading } from "react-icons/vsc";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export type IconTypes =
  | "Github"
  | "Discord"
  | "Telegram"
  | "Twitter"
  | "Facebook"
  | "Linkedin"
  | "Link"
  | "Copy"
  | "Check"
  | "CheckCircle"
  | "Menu"
  | "Close"
  | "Info"
  | "CaretLeft"
  | "Upload"
  | "Wallet"
  | "ExclamationCircle"
  | "Warning"
  | "Blockchain"
  | "ExternalLink"
  | "Search"
  | "Edit"
  | "User"
  | "Loader"
  | "Eye"
  | "EyeSlash"
  | "Plus"
  | "Undo"
  | "Ethereum"
  | "Clipboard"
  | "VscLoading"
  | "ChevronBackCircle"
  | "FillMoon"
  | "FillBrightness"
  | "GitBook"
  | "Admin";

export const iconList: { [key in IconTypes]: IconType } = {
  Facebook: BsFacebook,
  Discord: BsDiscord,
  Telegram: FaTelegramPlane,
  Twitter: BsTwitter,
  Copy: AiOutlineCopy,
  Check: AiOutlineCheck,
  CheckCircle: AiOutlineCheckCircle,
  VscLoading: VscLoading,
  Menu: FiMenu,
  Close: IoClose,
  Linkedin: BsLinkedin,
  Github: FaGithub,
  Link: FaExternalLinkAlt,
  Info: AiOutlineInfoCircle,
  ExclamationCircle: BsExclamationCircle,
  ExternalLink: GoLinkExternal,
  CaretLeft: AiFillCaretLeft,
  Upload: AiOutlineUpload,
  Wallet: IoWalletSharp,
  Warning: IoWarning,
  Blockchain: SiHiveBlockchain,
  Search: HiOutlineSearch,
  Edit: FiEdit,
  User: FaUserCircle,
  Loader: RiLoader5Fill,
  Clipboard: HiOutlineClipboard,
  Eye: BsEye,
  EyeSlash: BsEyeSlash,
  Undo: CgUndo,
  GitBook: SiGitbook,
  Plus: AiOutlinePlus,
  Ethereum: FaEthereum,
  FillMoon: BsFillMoonFill,
  FillBrightness: BsFillBrightnessHighFill,
  ChevronBackCircle: IoChevronBackCircleOutline,
  Admin: MdOutlineAdminPanelSettings,
};

interface IconProps extends IconBaseProps {
  type: IconTypes;
}

const defaultIconColors: Partial<Record<IconTypes, string>> = {
  Facebook: "#3b5998",
  Twitter: "#55acee",
  Linkedin: "#0077b5",
  Github: "#ffffff",
  Discord: "#7289da",
};

export default function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const Icon = iconList[type];
  return <Icon color={defaultIconColors[type]} {...rest} />;
}

export const getIcon = (type: IconTypes) => iconList[type];
