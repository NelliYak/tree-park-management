const TREE_PHOTOS = {
  'Дуб черешчатый':
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  'Клен остролистный':
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'Липа мелколистная':
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80',
  fallback:
    'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
};

export function getTreePhoto(speciesName) {
  return (
    TREE_PHOTOS[speciesName] ?? TREE_PHOTOS.fallback
  );
}
