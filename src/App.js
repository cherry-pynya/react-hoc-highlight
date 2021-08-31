import React, { useState } from 'react';

function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props) {
    const Wraper = wraper(props);

    return (
        <Wraper>
            <div className="item item-article">
                <h3><a href="#">{props.title}</a></h3>
                <p className="views">Прочтений: {props.views}</p>
            </div>
        </Wraper>
    )
};

function Video(props) {
    const Wraper = wraper(props);

    return (
        <Wraper>
            <div className="item item-video">
                <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title={props.url}></iframe>
                <p className="views">Просмотров: {props.views}</p>
            </div>
        </Wraper>
    )
};

function List(props) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <Video {...item} />
                );

            case 'article':
                return (
                    <Article {...item} />
                );
            default:
                return false;
        }
    });
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    const ListUpgrade = UpgradeList(List, list,  New, Popular)

    return (
        <ListUpgrade />
    );
}

function UpgradeList(Component, list, New, Popular) {
    list.map((el) => {
        if (el.views > 1000) el.wraper = Popular;
        if (el.views < 100) el.wraper = New;
        return el;
    });
    
    function upgrade() {
        return <Component list={list} />
    }

    return upgrade;
}

function DumDum(props) {
    return(
        <div>
            {props.children}
        </div>
    );
}

function wraper(obj) {
    if (obj.hasOwnProperty('wraper')) return obj.wraper;
    return DumDum;
}