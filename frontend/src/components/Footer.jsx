import React from "react";
import { Github, HeartFill } from "react-bootstrap-icons";
import "../App.css";

const Footer = () => (
    <footer className="py-3 mt-auto">
        <div className="container footer-content">
            <span>
                &copy; 2025 MovieRise
            </span>
            <span className="text-danger">
                <HeartFill size={16} className="mx-1" />
            </span>
            <a
                href="https://github.com/AutoMendes/MovieRise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-danger"
                title="GitHub"
            >
                <Github size={20} />
            </a>
        </div>
    </footer>
);

export default Footer;