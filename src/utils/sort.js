const sortByParam = (posts, sortBy) => {
    switch (sortBy) {
        case ('idDownUp'):
            return [...posts].sort((a, b) => a.id - b.id);
        case ('idUpDown'):
            return [...posts].sort((a, b) => b.id - a.id);
        case ('titleDownUp'):
            return [...posts].sort((a,b) => a.title.localeCompare(b.title));
        case ('titleUpDown'):
            return [...posts].sort((a,b) => b.title.localeCompare(a.title));
        case ('bodyDownUp'):
            return [...posts].sort((a,b) => a.body.localeCompare(b.body));
        case ('bodyUpDown'):
            return [...posts].sort((a,b) => b.body.localeCompare(a.body));
        default:
            return [...posts];
    }
}

export default sortByParam;