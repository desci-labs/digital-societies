import { IconType } from "react-icons";
import {
  AiFillCaretLeft,
  AiOutlineCheck,
  AiOutlineCopy,
  AiOutlineEdit,
  AiOutlineInfoCircle,
  AiOutlineUpload,
} from "react-icons/ai";
import {
  BiSearchAlt2,
} from "react-icons/bi";
import {
  BsDiscord,
  BsExclamationCircle,
  BsFacebook,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTelegramPlane,
  FaUserCircle,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";
import { IoClose, IoWalletSharp, IoWarning } from "react-icons/io5";
import { IconBaseProps } from "react-icons/lib";
import { SiHiveBlockchain } from "react-icons/si";

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

export const iconList: { [key in IconTypes]: IconType } = {
  Facebook: BsFacebook,
  Discord: BsDiscord,
  Telegram: FaTelegramPlane,
  Twitter: BsTwitter,
  Copy: AiOutlineCopy,
  Check: AiOutlineCheck,
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
  Search: BiSearchAlt2,
  Edit: AiOutlineEdit,
  User: FaUserCircle,
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
}

export default function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const Icon = iconList[type];
  return <Icon color={defaultIconColors[type]} {...rest} />;
}

export const getIcon = (type: IconTypes) => iconList[type];
