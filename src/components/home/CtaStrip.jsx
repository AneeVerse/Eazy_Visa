"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../common/Layout";
import { FaArrowRight } from "react-icons/fa";

export default function CtaStrip() {
    return (
        <section className="py-12 lg:py-16">
            <Layout>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary-500 rounded-2xl px-8 py-10 lg:py-12 text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                        Ready to Apply?
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto">
                        Get visa support now — and add dummy flight tickets for visa only if your checklist requires flight proof.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-white text-primary-500 px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        Start My Visa Application
                        <FaArrowRight />
                    </Link>
                </motion.div>
            </Layout>
        </section>
    );
}
