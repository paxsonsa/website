'use client';

import Link from "next/link";


export default function BlogList({ blogs }) {

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only by date, not time

    return (<ol className="flex flex-col space-y-3 pt-8">
        {blogs.map((blog) => {
            const options = { year: "numeric", month: "long", day: "2-digit" };
            const formattedDate = blog.date.toLocaleDateString(
                "en-US",
                options,
            );
            if (blog.meta.hide || blog.date > today) {
                return <></>;
            }

            return (
                <Link
                    href={`/blog/${blog.slug}`}
                    className={`flex flex-row space-x-8 border-b border-transparent hover:border-neutral-300 has-[:hover]:*:text-neutral-700`}
                >
                    <span className="font-light w-50 text-l font-mono text-neutral-500">
                        {formattedDate}
                    </span>
                    <span className="text-neutral-500 text-l">
                        {blog.meta.title}
                    </span>
                </Link>
            );
        })}
    </ol >);
}