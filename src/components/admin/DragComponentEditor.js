import { useState } from "react";
import { List, arrayMove } from "react-movable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import renderArticleComponent from "@/lib/renderArticleComponent.js";
import TextareaAutosize from "react-textarea-autosize";

const componentTypes = [
  "Paragraph",
  "Section",
  "Title",
  "Code",
  "Image",
  "Custom Component",
];

const componentFields = {
  Paragraph: [{ type: "text", name: "Content", default: "Hello World!" }],
  Section: [{ type: "text", name: "Title", default: "Cool Section!" }],
  Title: [{ type: "text", name: "Value", default: "Cool Article!" }],
  Code: [
    { type: "text", name: "Code", default: 'print("Hello World!")' },
    { type: "text", name: "Language", default: "python" },
    {
      type: "dropdown",
      name: "Runnable",
      default: "True",
      options: ["True", "False"],
    },
  ],
  Image: [{ type: "text", name: "src", default: "/hello.png" }],
  "Custom Component": [
    { type: "text", name: "Code", default: "<button>hello</button>" },
  ],
};

/*
const componentTypes = ["MCQ", "FRQ", "MULTISELECT"];

const componentFields = {
  "MCQ": [
    {type: "text", name: "Prompt", default: "Prompt"},
    {type: "text", name: "Choice A", default: "A"},
    {type: "text", name: "Choice B", default: "B"},
    {type: "text", name: "Choice C", default: "C"},
    {type: "text", name: "Choice D", default: "D"}
  ],
  "FRQ": [
    {type: "text", name: "Prompt", default: "Prompt"},
    {type: "text", name: "Skeleton", default: ""}
  ],
  "MULTISELECT": [
    {type: "text", name: "Prompt", default: "Prompt"},
    {type: "text", name: "Choice A", default: "A"},
    {type: "text", name: "Choice B", default: "B"},
    {type: "text", name: "Choice C", default: "C"},
    {type: "text", name: "Choice D", default: "D"}
  ]
};
*/

function Component({ data, setData }) {
  return (
    <div>
      {componentFields[data.type]?.map((option, i) => {
        if (option.type == "text") {
          return (
            <div key={i}>
              <p>{option.name}</p>
              <TextareaAutosize
                maxRows={15}
                style={{ color: "black", width: "100%" }}
                value={data[option.name]}
                onChange={(event) => {
                  setData({
                    ...data,
                    [option.name]: event.target.value,
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
                    [option.name]: value,
                  });
                }}
                value={data[option.name]}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default function DragComponentEditor({ items, setItems }) {
  function setData(index, newData) {
    setItems(
      items.map((item, i) => {
        if (i == index) {
          return newData;
        } else {
          return item;
        }
      })
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50vw", padding: "20px" }}>
        <List
          values={items}
          onChange={({ oldIndex, newIndex }) =>
            setItems(arrayMove(items, oldIndex, newIndex))
          }
          renderList={({ children, props }) => <ul {...props}>{children}</ul>}
          renderItem={({ value, isDragged, props }) =>
            value && (
              <div {...props}>
                <div style={{ padding: "10px" }}>
                  <div style={{ background: "grey", width: "100%" }}>
                    <Dropdown
                      options={componentTypes}
                      onChange={({ value }) => {
                        let newData = { type: value };

                        componentFields[value].forEach((field) => {
                          newData[field.name] = field.default;
                        });

                        setData(props.key, newData);
                      }}
                      value={value.type}
                    />

                    <Component
                      data={value}
                      setData={(newData) => {
                        setData(props.key, newData);
                      }}
                    />

                    <img
                      width="20px"
                      height="20px"
                      src="/trash.svg"
                      className="hover:scale-110"
                      onClick={() => {
                        setItems(items.filter((item, i) => i != props.key));
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          }
          lockVertically={true}
        />

        <button
          onClick={() => {
            setItems([
              ...items,
              {
                type: "Paragraph",
                Content: "Hello World",
              } /*{type: "MCQ", Prompt: "Prompt", "Choice A": "A", "Choice B": "B", "Choice C": "C", "Choice D": "D"}*/,
            ]);
          }}
        >
          Add New Component
        </button>
      </div>

      <div
        className="prose prose-invert max-w-none w-1/2 prose-h1:text-center"
        style={{ width: "50vw", padding: "20px" }}
      >
        {items.map((item, i) => (
          <div className="child:m-0" key={Math.random()}>
            {renderArticleComponent(item)}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
