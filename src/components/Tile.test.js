import { render, screen, fireEvent } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import Tile from './Tile';

test('calls onTileClick when tile is clicked', () => {
    const handleClick = vi.fn();
    const mockGame = { id: '1', slug: 'cool-game', name: 'Cool Game', title: 'Cool Game', image: { path: '/some-image.jpg' }, video: '/some-video.mp4' };
  
    render(<Tile game={mockGame} onTileClick={handleClick} />);

    fireEvent.click(screen.getByRole('img'));
    expect(handleClick).toHaveBeenCalledWith('cool-game');
});

// unfortunately testing isn't not working due to dependencies in plugins/configs or something else, I would love to discuss this with dev team 🤓