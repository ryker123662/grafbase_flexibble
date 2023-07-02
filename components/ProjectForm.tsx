"use client";

import { SessionInterface, ProjectInterface } from "@/common.types";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
    type: string;
    session: SessionInterface;
    project?: ProjectInterface;
};

const ProjectForm = ({ type, session }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        liveSiteUrl: "",
        githubUrl: "",
        category: "",
    });

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        const { token } = await fetchToken();

        try {
            if (type === "create") {
                await createNewProject(form, session?.user?.id, token);

                router.push("/");
            }

            // if (type === "edit") {
            //     await updateProject(form, project?.id as string, token);

            //     router.push("/");
            // }
        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes("image")) {
            return alert("Please upload an image file");
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const result = reader.result as string;

            handleStateChange("image", result);
        };
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form">
            <div className="flexStart form_image-container">
                <label
                    htmlFor="poster"
                    className="flexCenter form_image-label">
                    {!form.image && "Choose a poster for your project"}
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === "create"}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20"
                        alt="Project poster"
                        fill
                    />
                )}
            </div>

            <FormField
                title="Title"
                state={form.title}
                placeholder="Flexibble"
                setState={(value) => handleStateChange("title", value)}
            />
            <FormField
                title="Description"
                state={form.description}
                placeholder="Showcase and discover the latest work from top online portfolios by creative professionals across industries."
                setState={(value) => handleStateChange("description", value)}
            />
            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://portfolio-janicki.vercel.app/"
                setState={(value) => handleStateChange("liveSiteUrl", value)}
            />
            <FormField
                type="url"
                title="GitHub URL"
                state={form.githubUrl}
                placeholder="https://github.com/ryker123662"
                setState={(value) => handleStateChange("githubUrl", value)}
            />

            <CustomMenu
                title="category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange("category", value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={
                        isSubmitting
                            ? `${type === "create" ? "Creating" : "Editing"}`
                            : `${type === "create" ? "Create" : "Edit"}`
                    }
                    type="submit"
                    leftIcon={isSubmitting ? "" : "/plus.svg"}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
};

export default ProjectForm;
