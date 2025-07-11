import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useTranslation } from "react-i18next";

interface LanguageDropdownProps {
  onLanguageChange?: (language: string) => void;
  style?: React.CSSProperties;
}

export default function LanguageDropdown({
  onLanguageChange,
  style,
}: LanguageDropdownProps) {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const languages = [
    { value: "en", label: "English" },
    { value: "el", label: "Ελληνικά" },
    { value: "pl", label: "Polski" },
    { value: "it", label: "Italiano" },
    { value: "es", label: "Español" },
    { value: "de", label: "Deutsch" },
    { value: "pt", label: "Português" },
    { value: "nl", label: "Nederlands" },
    { value: "fr", label: "Français" },
    { value: "ro", label: "Română" },
    { value: "zh-tw", label: "繁體中文" },
  ];

  const handleChange = (value: string) => {
    console.log('Language changing to:', value);
    i18n.changeLanguage(value);
    console.log('Current i18n language after change:', i18n.language);
    onLanguageChange?.(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className={`${isMobile ? 'w-24 text-xs' : 'w-28 text-sm'}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value} className={isMobile ? 'text-xs' : 'text-sm'}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
