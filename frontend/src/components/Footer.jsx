import React from "react";
import { Github, HeartFill } from "react-bootstrap-icons";
import "../App.css";

const Footer = () => (
    <footer className="py-3 mt-auto">
        <div className="container footer-content">
            <span>
                &copy; 2025 MovieRise
            </span>
            <span className="text-warning">
                <HeartFill size={16} className="mx-1" />
            </span>
            <a
                href="https://github.com/AutoMendes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warning"
                title="GitHub"
            >
                <Github size={20} />
            </a>
        </div>
    </footer>
);

export default Footer;