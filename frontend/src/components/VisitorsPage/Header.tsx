import { useState } from "react";
import type { FC } from "react";
import "./Header.css";
import CommonButton from "../../components/buttons/CommonButton/CommonButton";
import Modal from "../../components/modals/Modal"; // добавили импорт модалки
import Logo from "../../assets/AgronomSadLogo.svg";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  presentCount: number;
  absentCount: number;
}

const Header: FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  presentCount,
  absentCount,
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
          <div className="stats-title">Посетили</div>
          <div className="stats-values">
            <span className="stats-visited">{presentCount}</span> /{" "}
            <span className="stats-expected">{absentCount}</span>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 style={{ marginBottom: "1rem" }}>Добавить посетителя</h2>
        <form>
          <input
            type="text"
            placeholder="ФИО"
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Компания"
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
          <CommonButton color="green" type="submit">
            Сохранить
          </CommonButton>
        </form>
      </Modal>
    </>
  );
};

export default Header;
