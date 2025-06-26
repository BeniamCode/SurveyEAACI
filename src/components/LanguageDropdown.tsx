import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface LanguageDropdownProps {
  onLanguageChange: (language: string) => void;
  style?: React.CSSProperties;
}

export default function LanguageDropdown({ onLanguageChange, style }: LanguageDropdownProps) {
  const { i18n } = useTranslation();

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'el', label: 'Ελληνικά' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
    { value: 'pl', label: 'Polski' },
    { value: 'pt', label: 'Português' },
    { value: 'ro', label: 'Română' }
  ];

  const handleChange = (value: string) => {
    onLanguageChange(value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      options={languages}
      style={{ minWidth: 120, ...style }}
      size="small"
    />
  );
}