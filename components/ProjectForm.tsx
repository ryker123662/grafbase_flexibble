"use client";

import { SessionInterface } from "@/common.types";
import { ChangeEvent } from "react";

type Props = {
    type: string;
    session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
    const handleFormSubmit = (e: React.FormEvent) => {};
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};

    const image = null;

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form">
            <div className="flexStart form_image-container">
                <label
                    htmlFor="poster"
                    className="flexCenter form_image-label">
                    {!image && "Choose a poster for your project"}
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === "create"}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                
            </div>
        </form>
    );
};

export default ProjectForm;
