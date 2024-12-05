import MyForm from "./components/Form/Form";
import css from "./page.module.css";
export default function Home() {
  return (
    <div className={css.page}>
      <MyForm />
    </div>
  );
}
