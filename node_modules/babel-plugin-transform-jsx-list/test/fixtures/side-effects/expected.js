import { createList as __create_list__ } from "babel-runtime-jsx-plus";
const items = [1, 2, 3, 4];
export default function List() {
  return <div>
      {__create_list__.call(this, items, (it, idx) => <div>
        <span>{it}</span>
      </div>)}
    </div>;
}