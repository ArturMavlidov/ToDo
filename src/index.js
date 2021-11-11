import TodoComponent from "./js/components/todo";
import "./scss/main.scss";
import './css/main.css'
import './scss/main.scss'
import { selectRole } from "./js/helpers";

const todo = selectRole('todo')

todo && TodoComponent(todo);