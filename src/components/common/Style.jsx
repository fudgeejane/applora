export default function Styling() {
  return {
    primaryBg: 'bg-[#F5F5F5]',
    secondaryBg: 'bg-[#FFFFFF]',
    headerBg: 'bg-[#FAFAFA]',

    border: 'border-[#CCCCCC]',
    divide: 'divide-[#CCCCCC]',

    // Hovers
    primaryBgHover: 'hover:bg-[#f0f0f0]',
    secondaryBgHover: 'hover:bg-[#f5f5f5]',
    headerHover: 'hover:bg-[#f5f5f5]',

    // Inputs
    input: 'focus:outline-none focus:ring-0 bg-[#FAFAFA] border-[#DDDDDD] text-[#333333]',
    dot: 'bg-transparent border-transparent hover:rounded-md transition cursor-pointer text-[#333333] hover:bg-gray-200',

    blueGradient: 'bg-gradient-to-r from-[#161647] to-[#1d1d63]',

    // Paragraph Texts
    primaryText: 'text-[#333333]',
    secondaryText: 'text-[#666666]',
    tertiaryText: 'text-[#999999]',
    primaryTexHover: 'hover:text-gray-800',

    // Tabs
    tabHover: 'hover:bg-blue-100 text-gray-700',
    activeTab: 'font-semibold border-b-2 border-blue-600 bg-blue-200/70 text-blue-700',

    // Buttons
    buttonBlue: 'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-500',
    buttonGreen: 'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white bg-green-600 hover:bg-green-500',
    buttonRed: 'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white bg-red-500 hover:bg-red-400',
    buttonGray: 'cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed bg-gray-300 hover:bg-gray-400 hover:text-gray-100 text-gray-500',
    buttonPurple: 'cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed text-white bg-purple-600 hover:bg-purple-500',
    closeButton: 'font-extrabold cursor-pointer text-gray-400 hover:text-red-500',
    
    // Colored Backgrounds
    yellowBg: 'bg-yellow-100',
    yellowBg2: 'bg-yellow-200/50',
    redBg: 'bg-red-400 text-white',
    redBg2: 'bg-red-200/50',
    blueBg2: 'bg-blue-200/50',
    blueBg: 'bg-blue-500',
    greenBg2: 'bg-green-200/50',
    greenBg: 'bg-green-600 text-white',
    grayBg: 'bg-gray-100',
    grayBg2: 'bg-gray-200/50',
    purpleBg2: 'bg-purple-200/50',

    blueBg2hover: 'hover:bg-blue-200/50 hover:border-blue-300',
    purpleBg2hover: 'hover:bg-purple-200/50 hover:border-purple-300',

    gamingBg: 'bg-gradient-to-r from-purple-400 via-blue-400 to-white',
    // Text Colors
    yellowText: 'text-yellow-700',
    redText: 'text-red-700',
    blueText: 'text-blue-800',
    greenText: 'text-green-500', // Same in both modes
    grayText: 'text-gray-600',
    orangeText: 'text-orange-400',
    purpleText: 'text-purple-600',

    // Border Colors
    yellowBorder: 'border-yellow-400',
    redBorder: 'border-red-400',
    blueBorder: 'border-blue-500',
    greenBorder: 'border-green-300',
    grayBorder: 'border-gray-300',
    purpleBorder: 'border-purple-300',

    // Answers
    correct: 'bg-green-200/50 text-gray-600',
    wrong: 'bg-red-200/50',
    coorectText: 'text-green-700',

    // Background Hovers
    blueHover: 'hover:bg-blue-50',

    // Navigation
    navBg: 'bg-gray-200 hover:bg-gray-300 text-gray-600',

  };
}
