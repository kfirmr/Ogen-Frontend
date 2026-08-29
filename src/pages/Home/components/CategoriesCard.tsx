import type { FC } from "react";
import Card from "../../../components/Card/Card";
import { useStyles } from "./CategoriesCard.style";
import BarChart from "../../../components/BarChart/BarChart";
import type { ICategoryExpense } from "../../../interfaces/expense.interface";

interface ICategoriesCardProps {
  title: string;
  categories: ICategoryExpense[];
}

const CategoriesCard: FC<ICategoriesCardProps> = ({ title, categories }) => {
  const styles = useStyles();

  return (
    <Card>
      <h3 style={styles.title}>{title}</h3>

      <div style={styles.chart}>
        <BarChart bars={categories} />
      </div>

      <div style={styles.legend}>
        {categories.map((category) => (
          <div key={category.label} style={styles.legendItem}>
            <img alt="" src={category.icon} style={styles.icon} />
            <span style={styles.value}>{category.value.toLocaleString()}</span>
            <span style={styles.label}>{category.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoriesCard;
