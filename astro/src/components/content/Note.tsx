import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo"
import { faCircleRadiation } from "@fortawesome/free-solid-svg-icons/faCircleRadiation"
import { faBomb } from "@fortawesome/free-solid-svg-icons/faBomb"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck"
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock"

import "./Note.css"

export enum NoteTypes {
    INFO = `info`,
    TLDR = `tldr info`,
    SUCCESS = `success`,
    WARN = `warn`,
    DANGER = `danger`,
}

interface CalloutProps {
    title?: string;
    type?:  NoteTypes;
    showIcon?: boolean;
    children: any;
}

interface Props {
    title?: string;
    showIcon?: boolean;
    children: any;
}

const Callout = ({title, type = NoteTypes.INFO, showIcon = true, children}: CalloutProps) => {
    const iconMap = {
        [NoteTypes.INFO]: faCircleInfo,
        [NoteTypes.TLDR]: faClock,
        [NoteTypes.WARN]: faCircleRadiation,
        [NoteTypes.SUCCESS]: faCircleCheck,
        [NoteTypes.DANGER]: faBomb,
    }

    const icon = iconMap[type]

    return <aside className={`note ${type ? type : ""}`}>
        {showIcon && <div className="note-icon"><FontAwesomeIcon icon={icon} /></div>}
        {title && <div className="title">
            {title}
        </div>}
        <div className="body">
            {children}
        </div>
    </aside>
}

export const Info = ({title, showIcon = true, children}: Props) => {
    return <Callout type={NoteTypes.INFO} title={title} showIcon={showIcon}>
        {children}
    </Callout>
}

export const Warn = ({title, showIcon = true, children}: Props) => {
    return <Callout type={NoteTypes.WARN} title={title} showIcon={showIcon}>
        {children}
    </Callout>
}

export const TLDR = ({title, showIcon = true, children}: Props) => {
    return <Callout type={NoteTypes.TLDR} title={title} showIcon={showIcon}>
        {children}
    </Callout>
}

export const Success = ({title, showIcon = true, children}: Props) => {
    return <Callout type={NoteTypes.SUCCESS} title={title} showIcon={showIcon}>
        {children}
    </Callout>
}

export const Danger = ({title, showIcon = true, children}: Props) => {
    return <Callout type={NoteTypes.DANGER} title={title} showIcon={showIcon}>
        {children}
    </Callout>
}
