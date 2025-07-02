import { useState, useEffect } from "react";
import { Select } from "antd";
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
    { value: "zh-tw", label: "繁體中文" },
  ];

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    onLanguageChange?.(value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      options={languages}
      style={{
        minWidth: isMobile ? 100 : 120,
        fontSize: isMobile ? "12px" : "14px",
        ...style,
      }}
      size={isMobile ? "small" : "small"}
      dropdownStyle={{
        fontSize: isMobile ? "12px" : "14px",
      }}
    />
  );
}
