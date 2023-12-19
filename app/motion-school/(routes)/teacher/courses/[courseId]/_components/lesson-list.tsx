"use client";
import React, { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
interface LessonsListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const LessonList = ({ items, onReorder, onEdit }: LessonsListProps) => {
  const [mounted, setMounted] = useState(false);
  const [lessons, setLessons] = useState(items);

  //here we are making sure that client side and server side rendering should be same else it will create dehydration error
  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    setLessons(items);
  }, [items]);


  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    console.log(result)
    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedlessons = items.slice(startIndex, endIndex + 1);

    setLessons(items);

    const bulkUpdateData = updatedlessons.map((lesson) => ({
      id: lesson.id,
      position: items.findIndex((item) => item.id === lesson.id)
    }));

    onReorder(bulkUpdateData);
  }

  if (!mounted) {
    return null;
  }


  return (
    <div className="lg:col-span-6 h-fit">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lessons">
        {/* Now when wrapping our lessons with a Droppable, we get an error: children is not a function. The Droppable utilizes the Render Props pattern and expects its child to be a function that returns a react component. To fix this, we have to put our TaskList inside of a function. */}
          {(provided) => (
            // provided is our first prop in our function. This will give us things like droppableProps which we will use to designate which component we want as our droppable.
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lessons.map((lesson, index) => (
                <Draggable
                  key={lesson.id}
                  draggableId={lesson.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2  border-indigo-500 overflow-x-scroll lg:overflow-hidden  text-xs border text-slate-700 rounded-md mb-4 lg:text-sm",
                        lesson.isPublished &&
                          "bg-amber-100 border-indigo-200 text-indigo-500"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-amber-200 hover:bg-indigo-500 rounded-l-md transition ",
                          lesson.isPublished &&
                            "border-r-indigo-200 hover:bg-indigo-200"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip size={20} className="text-amber-400"/>
                      </div>
                     <span className="text-slate-700"> {lesson.title}</span>
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {lesson.isFree && <Badge className="bg-amber-400 text-indigo-500 hover:bg-indigo-200 ">Free</Badge>}
                        <Badge
                          className={cn(
                            "bg-indigo-500",
                            lesson.isPublished && "bg-amber-400",
                            "hover:bg-indigo-600"

                          )}
                        >
                          {lesson.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Pencil
                          onClick={() => onEdit(lesson.id)}
                          className="cursor-pointer hover:opacity-75 transition text-indigo-500"
                          size={17}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {/* The placeholder needs to be added as a child of the component that you designate as the droppable. This concludes the droppable. */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LessonList;
