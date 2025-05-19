import { useState } from "react";
import type { FC } from "react";
import "./Header.css";
import CommonButton from "../../components/buttons/CommonButton/CommonButton";
import AddVisitorFormModal from "../forms/AddVisitorForm/AddVisitorForm";
import Logo from "../../assets/AgronomSadLogo.svg";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  presentCount: number;
  absentCount: number;
  onVisitorAdded: () => void;
}

const Header: FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  presentCount,
  absentCount,
  onVisitorAdded,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="visitors-header">
        <img src={Logo} alt="Логотип" className="logo" />
        <div className="header-center">
          <input
            className="search-input"
            placeholder="Поиск по имени"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CommonButton color="green" onClick={() => setIsModalOpen(true)}>
            Добавить
          </CommonButton>
        </div>
        <div className="stats">
          <div className="stats-title">Посетители</div>
          <div className="stats-values">
            <span className="stats-visited">{presentCount}</span> /{" "}
            <span className="stats-expected">{absentCount}</span>
          </div>
        </div>
      </div>

      <AddVisitorFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onVisitorAdded}
      />
    </>
  );
};

export default Header;
