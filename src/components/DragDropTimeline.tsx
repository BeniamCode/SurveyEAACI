import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

interface FoodItem {
  label: string;
  value: string;
}

interface FoodGroup {
  name: string;
  items: FoodItem[];
}

interface TargetList {
  id: string;
  label: string;
  conditional_logic: {
    depends_on: string;
    value: string;
  };
  timeline: string[];
}

interface DragDropTimelineProps {
  foodGroups: FoodGroup[];
  targetLists: TargetList[];
  sourceListTitle: string;
  onChange: (result: {
    [timelineId: string]: { [month: string]: FoodItem[] };
  }) => void;
  value?: { [timelineId: string]: { [month: string]: FoodItem[] } };
  surveyData?: any;
}

export default function DragDropTimeline({
  foodGroups,
  targetLists,
  sourceListTitle,
  onChange,
  value = {},
  surveyData = {},
}: DragDropTimelineProps) {
  const [placements, setPlacements] = useState<{
    [timelineId: string]: { [month: string]: FoodItem[] };
  }>(value);

  // Filter target lists based on conditional logic
  const visibleTargetLists = targetLists.filter((list) => {
    const dependsOnValue = surveyData[list.conditional_logic.depends_on];
    return dependsOnValue === list.conditional_logic.value;
  });

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return;

      // Parse the dragged item
      const draggedItem = JSON.parse(result.draggableId);

      if (destination.droppableId.startsWith("timeline-")) {
        // Extract timeline ID and month from destination
        const [, timelineId, month] = destination.droppableId.split("-", 3);

        const newPlacements = { ...placements };

        // Initialize timeline if it doesn't exist
        if (!newPlacements[timelineId]) {
          newPlacements[timelineId] = {};
        }

        // Initialize month array if it doesn't exist
        if (!newPlacements[timelineId][month]) {
          newPlacements[timelineId][month] = [];
        }

        // Add item to the month (allow multiple items per month)
        const monthItems = [...newPlacements[timelineId][month]];

        // Check if item already exists in this month
        const existingIndex = monthItems.findIndex(
          (item) => item.value === draggedItem.value
        );
        if (existingIndex === -1) {
          monthItems.push(draggedItem);
          newPlacements[timelineId][month] = monthItems;

          setPlacements(newPlacements);
          onChange(newPlacements);
        }
      }
    },
    [placements, onChange]
  );

  const removeItem = useCallback(
    (timelineId: string, month: string, itemIndex: number) => {
      const newPlacements = { ...placements };
      if (newPlacements[timelineId] && newPlacements[timelineId][month]) {
        const monthItems = [...newPlacements[timelineId][month]];
        monthItems.splice(itemIndex, 1);
        newPlacements[timelineId][month] = monthItems;

        setPlacements(newPlacements);
        onChange(newPlacements);
      }
    },
    [placements, onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Source List */}
        <div style={{ flex: "1", maxWidth: "300px" }}>
          <h3 style={{ marginBottom: "16px", color: "#333" }}>
            {sourceListTitle}
          </h3>
          <div
            style={{
              maxHeight: "600px",
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            {foodGroups.map((group, groupIndex) => (
              <div key={group.name} style={{ marginBottom: "20px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#555",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "4px",
                  }}
                >
                  {group.name}
                </h4>
                <Droppable droppableId={`source-${groupIndex}`}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ minHeight: "20px" }}
                    >
                      {group.items.map((item, itemIndex) => (
                        <Draggable
                          key={item.value}
                          draggableId={JSON.stringify(item)}
                          index={itemIndex}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                backgroundColor: snapshot.isDragging
                                  ? "#e6f7ff"
                                  : "#f9f9f9",
                                border: "1px solid #d9d9d9",
                                borderRadius: "4px",
                                padding: "8px 12px",
                                marginBottom: "4px",
                                cursor: "grab",
                                fontSize: "13px",
                                transition: "background-color 0.2s",
                              }}
                            >
                              {item.label}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>

        {/* Target Timelines */}
        <div style={{ flex: "2" }}>
          {visibleTargetLists.map((targetList) => (
            <div key={targetList.id} style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "16px", color: "#333" }}>
                {targetList.label}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#fafafa",
                }}
              >
                {targetList.timeline.map((month, monthIndex) => (
                  <div key={month} style={{ minHeight: "100px" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        textAlign: "center",
                        color: "#666",
                      }}
                    >
                      {month}
                    </div>
                    <Droppable
                      droppableId={`timeline-${targetList.id}-${month}`}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            minHeight: "60px",
                            backgroundColor: snapshot.isDraggingOver
                              ? "#e6f7ff"
                              : "#ffffff",
                            border: "2px dashed #ddd",
                            borderRadius: "4px",
                            padding: "4px",
                            transition: "background-color 0.2s",
                          }}
                        >
                          {placements[targetList.id]?.[month]?.map(
                            (item, itemIndex) => (
                              <div
                                key={`${item.value}-${itemIndex}`}
                                style={{
                                  backgroundColor: "#52c41a",
                                  color: "white",
                                  padding: "4px 8px",
                                  marginBottom: "2px",
                                  borderRadius: "3px",
                                  fontSize: "11px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    flex: 1,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.label.length > 15
                                    ? `${item.label.substring(0, 15)}...`
                                    : item.label}
                                </span>
                                <button
                                  onClick={() =>
                                    removeItem(targetList.id, month, itemIndex)
                                  }
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    padding: "0",
                                    marginLeft: "4px",
                                    fontSize: "12px",
                                  }}
                                  title="Remove"
                                >
                                  ×
                                </button>
                              </div>
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
