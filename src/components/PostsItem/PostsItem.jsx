import React from 'react';

const PostsItem = ({id, title, body}) => {
    return (
        <tr>
            <td style={{textAlign: 'center'}}>{id}</td>
            <td>{title}</td>
            <td>{body}</td>
        </tr>
    );
};

export default PostsItem;