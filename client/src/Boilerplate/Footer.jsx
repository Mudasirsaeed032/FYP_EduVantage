import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h4>About EduVantage</h4>
                        <p>
                            EduVantage is dedicated to helping students find the best master's programs that fit their goals and budgets. We provide personalized recommendations and guidance every step of the way.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/programs">Programs</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/faq">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h4>Contact Us</h4>
                        <p>
                            <i className="fas fa-envelope"></i> support@eduvantage.com
                        </p>
                        <p>
                            <i className="fas fa-phone"></i> +123 456 7890
                        </p>
                        <p>
                            <i className="fas fa-map-marker-alt"></i> 123 Edu Street, Learn City, Knowledge
                        </p>

                        {/* Social Media Icons */}
                        <div className="social-icons">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://www.instagram.com/muhammad_arham_akmal/"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 EduVantage. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
