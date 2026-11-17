import React from 'react';

/* Original vector decorations. These are drawings, never city/venue evidence. */
export function HandbookSketch({kind='housing',className=''}){
 const paths={
 housing:<><path fill="#e8b79a" stroke="none" d="M31 57 72 24l39 34-3 53-73 2Z"/><path d="m20 59 51-42 54 43M32 53l3 61 75-2-1-59M59 111l-1-34 25-1 2 36M43 64l10-1 1 13-11 1Z"/><path d="m97 36-1-16 12-1 2 28M15 115q54-4 119 0"/><path stroke="#a5aa79" d="m130 111 1-33m0 16q-15-2-14-15 15-1 14 15Zm1 7q14-2 13-14-14 0-13 14Z"/></>,
 career:<><path fill="#d2dcae" stroke="none" d="m29 54 100-4 4 59-102 4Z"/><path d="m27 51 105-1 2 61-104 3ZM56 50l-1-21 44-2 2 23M66 43l-1-9 25-1 1 11M29 76q47 12 104-2M73 80l15-1v13l-14 1Z"/><path d="m18 114 123-2M14 35l-6-7m15-1-1-9m115 19 9-5"/></>,
 education:<><path fill="#edcb91" stroke="none" d="M22 39q25-10 54 2 28-12 57-4l-2 67q-29-8-55 3-30-10-54 0Z"/><path d="M21 37q26-9 55 3 29-12 58-4l-3 70q-31-8-56 4-28-10-53 0ZM76 42l-1 67M35 55q16-2 26 3m-27 12q16-2 26 3m29-17 29-3m-29 19 27-3M41 25l-3-9m75 7 6-9"/></>,
 health:<><path fill="#e9b6a4" stroke="none" d="M24 58c-5-33 33-43 52-17 23-29 56-10 53 17-2 22-34 43-51 57-14-10-50-35-54-57Z"/><path d="M24 57C18 25 58 11 77 42c22-31 60-12 52 19-5 20-31 41-52 56-22-17-49-34-53-60ZM52 69h16l7-17 11 36 7-18h14M19 24l-8-6m24-4-1-9m111 74 8 2"/></>,
 transport:<><path fill="#c4d6d1" stroke="none" d="m39 26 66-3 9 71-77 1Z"/><path d="m39 25 66-2 9 72-78 1ZM48 37l49-1 3 26-53 2ZM45 80h9m42-1 8-1M48 96l-13 22m65-23 14 23M30 117q48-4 87 0M61 13l27-1M29 70l-13 2m9-20-17 1m110-18 20-3"/></>,
 service:<><path fill="#ddd0b8" stroke="none" d="m47 29 64-2 4 84-70 3Z"/><path d="m46 28 65-2 5 87-72 2ZM65 19l26-1 1 19-27 2ZM56 56l5 5 9-12m9 8 22-1M55 79l6 5 9-12m10 6 20-1M59 97l43-1"/><path stroke="#a5aa79" d="m24 112 4-36m-2 20Q9 90 13 76q16 4 13 20Zm1-8q17-7 12-21-16 7-12 21Z"/></>
 };
 return <svg className={'handbook-sketch '+className} viewBox="0 0 160 130" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[kind]||paths.housing}</svg>;
}

export function HandbookMasthead({city}){
 return <div className="handbook-masthead"><span><i/>城知 · 城市生活观察簿</span><span>{city.english?.toUpperCase()}<b>一座城，一本手册</b></span></div>;
}

export function MarginNote(){
 return <div className="photo-margin-note" aria-hidden="true"><svg viewBox="0 0 120 65" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 10q62-10 88 35m-12-3 15 7-2-15M13 59l23-4"/></svg><span>先安顿好，<br/>再慢慢熟悉。</span></div>;
}
