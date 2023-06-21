import { useState } from "react";
import { List, arrayMove } from "react-movable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import TextareaAutosize from "react-textarea-autosize";

function Component({ components, data, setData }) {
  return (
    <div>
      {components[data.type]?.map((option, i) => {
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

export default function DragComponentEditor({
  components,
  renderComponent,
  items,
  setItems,
}) {
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
                      options={Object.keys(components)}
                      onChange={({ value }) => {
                        let newData = { type: value };

                        components[value].forEach((field) => {
                          newData[field.name] = field.default;
                        });

                        setData(props.key, newData);
                      }}
                      value={value.type}
                    />

                    <Component
                      components={components}
                      data={value}
                      setData={(newData) => {
                        setData(props.key, newData);
                      }}
                    />

                    <button
                      onClick={() => {
                        setItems(items.filter((item, i) => i != props.key));
                      }}
                    >
                      <img
                        width="20px"
                        height="20px"
                        src="/trash.svg"
                        className="hover:scale-110"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          lockVertically={true}
        />

        <button
          onClick={() => {
            let newItem = {
              type: Object.keys(components)[0],
            };

            components[Object.keys(components)[0]].forEach((property) => {
              newItem[property.name] = property.default;
            });

            setItems([...items, newItem]);
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
            {renderComponent(item)}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
