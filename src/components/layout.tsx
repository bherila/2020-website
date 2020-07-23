import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Layout(props: { children?: any; bootstrap?: boolean }) {
  return (
    <>
      <Head>
        {props.bootstrap ? (
          <>
            <link
              rel="stylesheet"
              href="https://unpkg.com/bootstrap@4.5.0/dist/css/bootstrap.min.css"
            />
            <link
              rel="stylesheet"
              href="https://unpkg.com/devextreme@20.1.6/dist/css/dx.common.css"
            />
            <link
              rel="stylesheet"
              href="https://unpkg.com/devextreme@20.1.6/dist/css/dx.material.lime.dark.compact.css"
            />
            <link
              rel="stylesheet"
              href="https://unpkg.com/devextreme@20.1.6/dist/css/dx.material.lime.dark.compact.css"
            />
          </>
        ) : null}
      </Head>
      <header className="v3-container">
        <div
          data-collapse="tiny"
          data-animation="default"
          data-duration="400"
          role="banner"
          className="nav-v3 w-nav"
        >
          <div className="div-block"></div>
          <div className="header-flex-container">
            <Link href="/">
              <a className="brand w-nav-brand">
                <img
                  src="/images/kokopelli.png"
                  alt=""
                  className="inline-logo w-hidden-main"
                />
                <h1 className="nav-heading">Ben Herila</h1>
              </a>
            </Link>
            <nav role="navigation" className="nav-menu w-nav-menu">
              <Link href="/">
                <a className="navlink w-nav-link">Home</a>
              </Link>
              <Link href="/projects">
                <a className="navlink w-nav-link">Projects</a>
              </Link>
              <Link href="/resume">
                <a className="navlink w-nav-link">Résumé</a>
              </Link>
              <Link href="/consulting">
                <a className="navlink w-nav-link">Consulting</a>
              </Link>
              <a
                href="https://github.com/bherila/"
                target="_blank"
                rel="noreferrer"
                className="navlink w-hidden-main w-hidden-medium w-hidden-small w-nav-link"
              >
                Github
              </a>
            </nav>
            <div className="menu-button w-nav-button">
              <div className="icon w-icon-nav-menu" />
            </div>
          </div>
        </div>
      </header>
      {props.children}
      <footer className="footer">
        <div className="w-richtext">
          <p>
            &copy; 2011-2020 Benjamin Herila. All rights reserved. Some content
            may be copyright their respective owners and used with permission.
            This site does not collect or store any information about you.
          </p>
        </div>
        <div className="social-icons">
          <a
            href="http://github.com/bherila/"
            target="_blank"
            rel="noreferrer"
            className="navlink w-inline-block"
          >
            <img
              src="/images/github.svg"
              width="20"
              alt=""
              className="social-icon"
            />
          </a>
          <a
            href="https://linkedin.com/in/bherila"
            target="_blank"
            rel="noreferrer"
            className="navlink w-inline-block"
          >
            <img
              src="/images/linkedin.svg"
              width="20"
              alt=""
              className="social-icon"
            />
          </a>
          <a
            href="https://angel.co/bwh"
            target="_blank"
            rel="noreferrer"
            className="navlink w-inline-block"
          >
            <img
              src="/images/angellist.svg"
              width="20"
              alt=""
              className="social-icon"
            />
          </a>
          <a
            href="https://t.me/bengwho"
            target="_blank"
            rel="noreferrer"
            className="navlink w-inline-block"
          >
            <img
              src="/images/telegram.svg"
              width="20"
              alt=""
              className="social-icon"
            />
          </a>
        </div>
      </footer>
    </>
  )
}
