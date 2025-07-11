import React, { useState, useCallback, useEffect } from "react";
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
    [month: string]: FoodItem[];
  }) => void;
  value?: { [month: string]: FoodItem[] };
  surveyData?: any;
}

const months = ["Birth", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];

export default function DragDropTimeline({
  foodGroups,
  targetLists,
  sourceListTitle,
  onChange,
  value = {},
  surveyData = {},
}: DragDropTimelineProps) {
  console.log("DragDropTimeline props:", { foodGroups, targetLists, sourceListTitle, value });
  
  const [placements, setPlacements] = useState<{
    [month: string]: FoodItem[];
  }>(value);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<{
    [categoryName: string]: boolean;
  }>({});
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return;

      // Parse the dragged item
      const draggedItem = JSON.parse(result.draggableId);

      if (destination.droppableId.startsWith("month-")) {
        // Extract month from destination
        const month = destination.droppableId.replace("month-", "");

        const newPlacements = { ...placements };

        // Initialize month array if it doesn't exist
        if (!newPlacements[month]) {
          newPlacements[month] = [];
        }

        // Add item to the month (allow multiple items per month)
        const monthItems = [...newPlacements[month]];

        // Check if item already exists in this month
        const existingIndex = monthItems.findIndex(
          (item) => item.value === draggedItem.value
        );
        if (existingIndex === -1) {
          monthItems.push(draggedItem);
          newPlacements[month] = monthItems;
        }

        // Always update state and call onChange to ensure UI updates
        setPlacements(newPlacements);
        onChange(newPlacements);
        setForceUpdate(prev => prev + 1); // Force re-render
        
        console.log("Drag completed, new placements:", newPlacements);
      }
    },
    [placements, onChange, forceUpdate]
  );

  const removeItem = useCallback(
    (month: string, itemIndex: number) => {
      const newPlacements = { ...placements };
      if (newPlacements[month]) {
        const monthItems = [...newPlacements[month]];
        monthItems.splice(itemIndex, 1);
        newPlacements[month] = monthItems;

        setPlacements(newPlacements);
        onChange(newPlacements);
        setForceUpdate(prev => prev + 1); // Force re-render
      }
    },
    [placements, onChange, forceUpdate]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ width: "100%" }}>
        {/* Title Section */}
        <div style={{
          backgroundColor: "#e6f7ff",
          padding: isMobile ? "15px" : "20px",
          borderRadius: "8px",
          marginBottom: isMobile ? "15px" : "20px",
          border: "1px solid #91d5ff",
          textAlign: "center"
        }}>
          <h2 style={{
            margin: 0,
            color: "#1890ff",
            fontSize: isMobile ? "18px" : "22px",
            marginBottom: "8px"
          }}>
            📋 Food Introduction Timeline
          </h2>
          <p style={{
            margin: 0,
            fontSize: isMobile ? "14px" : "16px",
            color: "#0050b3",
            fontWeight: "500",
          }}>
            Drag & drop food items from the 'Advice' list to the appropriate month timeline(s)
          </p>
        </div>

        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "15px" : "25px", 
          padding: isMobile ? "10px" : "0px",
          width: "100%"
        }}>
          {/* Source List */}
          <div style={{ 
            flex: isMobile ? "none" : "0 0 300px", 
            minWidth: isMobile ? "100%" : "300px",
            maxWidth: isMobile ? "100%" : "300px",
            order: isMobile ? 2 : 1
          }}>
            <h3 style={{ 
              marginBottom: isMobile ? "12px" : "16px", 
              color: "#333",
              fontSize: isMobile ? "14px" : "16px"
            }}>
              {sourceListTitle}
            </h3>
            <div
              style={{
                maxHeight: isMobile ? "300px" : "600px",
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: isMobile ? "12px" : "16px",
              }}
            >
              {foodGroups && foodGroups.length > 0 ? foodGroups.map((group, groupIndex) => {
                const isExpanded = expandedCategories[group.name] ?? false;
                
                return (
                  <div key={group.name} style={{ 
                    marginBottom: isMobile ? "15px" : "20px" 
                  }}>
                    <h4
                      onClick={() => toggleCategory(group.name)}
                      style={{
                        fontSize: isMobile ? "12px" : "14px",
                        fontWeight: "bold",
                        color: "#555",
                        marginBottom: isMobile ? "6px" : "8px",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "4px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        userSelect: "none",
                      }}
                    >
                      <span>+ {group.name}</span>
                      <span style={{ 
                        fontSize: "16px", 
                        transition: "transform 0.2s",
                        transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)"
                      }}>
                        ▶
                      </span>
                    </h4>
                    {isExpanded && group.items.length > 0 && (
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
                                      padding: isMobile ? "6px 8px" : "8px 12px",
                                      marginBottom: "4px",
                                      cursor: "grab",
                                      fontSize: isMobile ? "11px" : "13px",
                                      transition: "background-color 0.2s",
                                      lineHeight: isMobile ? "1.2" : "1.4",
                                      touchAction: "none",
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
                    )}
                  </div>
                );
              }) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                  No food categories available
                </div>
              )}
            </div>
          </div>

          {/* Timeline Months */}
          <div style={{ 
            flex: isMobile ? "none" : "1",
            order: isMobile ? 1 : 2,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "10px" : "15px",
            width: "100%"
          }}>
            {months.map((month) => (
              <div key={month} style={{ 
                display: "flex",
                alignItems: "flex-start",
                gap: isMobile ? "8px" : "12px",
                padding: isMobile ? "8px" : "10px",
                backgroundColor: "#ffffff",
                borderRadius: "6px",
                border: "1px solid #e0e0e0",
                minHeight: isMobile ? "60px" : "70px"
              }}>
                <div
                  style={{
                    fontSize: isMobile ? "11px" : "13px",
                    fontWeight: "bold",
                    color: "#666",
                    minWidth: isMobile ? "60px" : "80px",
                    textAlign: "left",
                    paddingTop: "4px",
                    flexShrink: 0
                  }}
                >
                  {month}
                </div>
                <Droppable droppableId={`month-${month}`}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        flex: 1,
                        minHeight: isMobile ? "40px" : "50px",
                        backgroundColor: snapshot.isDraggingOver
                          ? "#e6f7ff"
                          : "#f9f9f9",
                        border: "2px dashed #ddd",
                        borderRadius: "4px",
                        padding: isMobile ? "6px" : "8px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: isMobile ? "4px" : "6px",
                        transition: "background-color 0.2s",
                        touchAction: "none",
                        alignItems: "flex-start",
                        alignContent: "flex-start"
                      }}
                    >
                      {!placements[month]?.length && (
                        <div style={{
                          color: "#999",
                          fontSize: isMobile ? "10px" : "12px",
                          fontStyle: "italic",
                        }}>
                          Drag foods here
                        </div>
                      )}
                      {placements[month]?.map((item, itemIndex) => (
                        <div
                          key={`${item.value}-${itemIndex}`}
                          style={{
                            backgroundColor: "#52c41a",
                            color: "white",
                            padding: isMobile ? "4px 6px" : "6px 8px",
                            borderRadius: "3px",
                            fontSize: isMobile ? "10px" : "12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            lineHeight: "1.2",
                            maxWidth: "fit-content",
                            whiteSpace: "nowrap"
                          }}
                        >
                          <span
                            style={{
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {isMobile 
                              ? (item.label.length > 10 
                                  ? `${item.label.substring(0, 10)}...` 
                                  : item.label)
                              : (item.label.length > 15
                                  ? `${item.label.substring(0, 15)}...`
                                  : item.label)
                            }
                          </span>
                          <button
                            onClick={() => removeItem(month, itemIndex)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "white",
                              cursor: "pointer",
                              padding: "0",
                              marginLeft: isMobile ? "2px" : "4px",
                              fontSize: isMobile ? "14px" : "12px",
                              minWidth: isMobile ? "16px" : "auto",
                              height: isMobile ? "16px" : "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              touchAction: "manipulation",
                            }}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
