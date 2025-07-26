import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import HeroBlock from '../blocks/HeroBlock.jsx';
import TwoColumnRow from '../blocks/TwoColumnRow.jsx';
import ImageGrid2x2 from '../blocks/ImageGrid2x2.jsx';
import BlockEditForm from './BlockEditForm.jsx';
import {
    saveLayoutConfig,
    loadLayoutConfig,
} from '../../utils/localStorage.js';
import './Editor.css';

const COMPONENTS_MAP = {
    hero: HeroBlock,
    twoColumn: TwoColumnRow,
    imageGrid: ImageGrid2x2,
};

const COMPONENTS_INFO = [
    { id: 'hero', name: 'Hero Block' },
    { id: 'twoColumn', name: 'Two Column Row' },
    { id: 'imageGrid', name: '2x2 Image Grid' },
];

export default function Editor({ onLayoutChange, onSEOChange, seoData, onThemeChange, themeData }) {
    const [layout, setLayout] = useState(() => loadLayoutConfig() || []);
    const [editingId, setEditingId] = useState(null);

    const addComponent = (type) => {
        const newId = `${type}-${Date.now()}`;
        let defaultProps;
        switch (type) {
            case 'hero':
                defaultProps = {
                    heading: "Welcome to the Site Builder",
                    subtitle: "Where we can build something great together",
                    cta: "Get Started",
                    imageUrl: "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg",
                };
                break;
            case 'twoColumn':
                defaultProps = {
                    leftHeading: "Our Services",
                    leftSubtitle: "We provide great services to our clients.",
                    leftCta: "Learn More",
                    rightImage: "https://images.pexels.com/photos/518244/pexels-photo-518244.jpeg",
                };
                break;
            case 'imageGrid':
                defaultProps = {
                    images: [
                        "https://images.pexels.com/photos/18207575/pexels-photo-18207575.jpeg",
                        "https://images.pexels.com/photos/5507254/pexels-photo-5507254.jpeg",
                        "https://images.pexels.com/photos/5507228/pexels-photo-5507228.jpeg",
                        "https://images.pexels.com/photos/29942539/pexels-photo-29942539.jpeg",
                    ]
                };
                break;
            default:
                defaultProps = {};
        }
        setLayout(prev => [...prev, { id: newId, type, props: defaultProps }]);
    };

    const removeComponent = (id) => {
        setLayout(prev => prev.filter(item => item.id !== id));
        if (editingId === id) setEditingId(null);
    };

    const updateBlockProps = (id, newProps) => {
        setLayout(prev =>
            prev.map(item =>
                item.id === id ? { ...item, props: { ...item.props, ...newProps } } : item
            )
        );
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId === 'layout' && destination.droppableId === 'layout') {
            const reordered = Array.from(layout);
            const [moved] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, moved);
            setLayout(reordered);
        }
        if (source.droppableId === 'available' && destination.droppableId === 'layout') {
            addComponent(result.draggableId);
        }
    };

    useEffect(() => {
        saveLayoutConfig(layout);
        onLayoutChange(layout);
    }, [layout]);

    return (
        <main className="editor" role="main" aria-label="Landing page editor">
            <h1 tabIndex={0}>Landing Page Editor</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="available" isDropDisabled={true}>
                    {(provided) => (
                        <aside
                            className="available-components"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            aria-label="Available components"
                        >
                            <h2 tabIndex={0}>Available Components</h2>
                            {COMPONENTS_INFO.map(({ id, name }, index) => (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`available-block ${snapshot.isDragging ? 'dragging' : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            tabIndex={0}
                                            aria-roledescription="Draggable component"
                                        >
                                            {name}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </aside>
                    )}
                </Droppable>
                <Droppable droppableId="layout">
                    {(provided) => (
                        <section
                            className="layout-area"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            aria-label="Layout area - Drop components here"
                        >
                            <h2 tabIndex={0}>Page Layout</h2>
                            {layout.length === 0 && (
                                <p tabIndex={0}>Drag components here to build your landing page</p>
                            )}
                            {layout.map(({ id, type, props }, index) => (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`layout-block ${snapshot.isDragging ? 'dragging' : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="block-header">
                                                <span>{COMPONENTS_INFO.find(c => c.id === type)?.name}</span>
                                                <div>
                                                    <button
                                                        aria-label={`Edit ${type} component`}
                                                        onClick={() => setEditingId(id === editingId ? null : id)}
                                                        title="Edit"
                                                        type="button"
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        aria-label={`Remove ${type} component`}
                                                        onClick={() => removeComponent(id)}
                                                        title="Remove"
                                                        type="button"
                                                    >
                                                        ✖
                                                    </button>
                                                </div>
                                            </div>
                                            {editingId === id ? (
                                                <BlockEditForm
                                                    type={type}
                                                    props={props}
                                                    onSave={(newProps) => { updateBlockProps(id, newProps); setEditingId(null); }}
                                                    onCancel={() => setEditingId(null)}
                                                />
                                            ) : (
                                                React.createElement(COMPONENTS_MAP[type], { ...props, key: id })
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </section>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
    );
}
