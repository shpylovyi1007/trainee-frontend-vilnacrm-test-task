import UserList from "./components/UsersList/UserList";
import css from "./page.module.css";

export default function Home() {
  return (
    <div className={css.page}>
      <UserList />
    </div>
  );
}
