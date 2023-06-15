import { useState } from "react";
import { List, arrayMove } from 'react-movable';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import renderArticleComponent from "@/lib/renderArticleComponent.js";

const componentTypes = ["Paragraph", "Section", "Title", "Code", "Image", "Custom Component"];

const componentFields = {
  "Paragraph": [
    {type: "text", name: "Content", default: "Hello World!"}
  ],
  "Section": [
    {type: "text", name: "Title", default: "Cool Section!"}
  ],
  "Title": [
    {type: "text", name: "Value", default: "Cool Article!"}
  ],
  "Code": [
    {type: "text", name: "Code", default: "print(\"Hello World!\")"},
    {type: "text", name: "Language", default: "python"},
    {type: "dropdown", name: "Runnable", default: "True", options: ["True", "False"]}
  ],
  "Image": [
    {type: "text", name: "src", default: "/hello.png"}
  ],
  "Custom Component": [
    {type: "text", name: "Code", default: "<button>hello</button>"}
  ],
};

function Component({ data, setData }) {
  return (
    <div style={{display: "flex"}}>
      {
        componentFields[data.type].map((option, i) => {
          if (option.type == "text") {
            return (
              <div key={i}>
                <p>{option.name}</p>
                <textarea
                  style={{color: "black"}}
                  value={data[option.name]}
                  onChange={(event) => {
                    setData({
                      ...data,
                      [option.name]: event.target.value
                    });
                  }}
                />
              </div>
            );
          } else if (option.type == "dropdown") {
            return (
              <div key={i}>
                <p>{option.name}</p>
                <Dropdown
                  options={option.options}
                  onChange={({ value }) => {
                    setData({
                      ...data,
                      [option.name]: value
                    });
                  }}
                  value={data[option.name]}
                />
              </div>
            );
          }
        })
      }
    </div>
  );
}


export default function SimpleEditor({ items, setItems }) {
  function setData(index, newData) {
    setItems(items.map((item, i) => {
      if (i == index) {
        return newData;
      } else {
        return item;
      }
    }));
  }

  return (
    <div style={{display: "flex"}}>
      <div style={{width: "50vw", padding: "20px"}}>
        <List
          values={items}
          onChange={({ oldIndex, newIndex }) =>
            setItems(arrayMove(items, oldIndex, newIndex))
          }
          renderList={({ children, props }) => <ul {...props}>{children}</ul>}
          renderItem={({ value, isDragged, props }) => (
            value && <div {...props} style={{background: "grey", marginBottom: "20px", width: isDragged ? "50%" : "100%"}}>
              <Dropdown
                options={componentTypes}
                onChange={({ value }) => {
                  let newData = { type: value };

                  componentFields[value].forEach(field => {
                    newData[field.name] = field.default;
                  });

                  setData(props.key, newData);
                }}
                value={value.type}
              />

              <Component data={value} setData={(newData) => { setData(props.key, newData) }} />

              <img width="20px" height="20px" src="/trash.svg" className="hover:scale-110" onClick={() => {
                setItems(items.filter((item, i) => i != props.key));
              }} />
            </div>
          )}
          lockVertically={true}
        />

        <button onClick={() => {setItems([...items, {type: "Paragraph", Content: "Hello World"}])}}>Add New Component</button>
      </div>

      <div className="prose prose-invert max-w-none w-1/2 prose-h1:text-center" style={{width: "50vw", padding: "20px"}}>
        {
          items.map((item, i) => (
            <div className="child:m-0" key={Math.random()}>
              {renderArticleComponent(item)}
            </div>
          ))
        }
      </div>
    </div>
  )
}
