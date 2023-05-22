import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from './PaginationControls.jsx';

describe('PaginationControls test', () => {
  test('only Next-button gets rendered on first page, clicking it calls the event handler', () => {

    const handleClick = vi.fn();

    render(<PaginationControls 
              page={0} 
              setPage={handleClick}
              isLastPage={false}
            />);
    expect(screen.getByText('Next')).toBeDefined();
    expect(screen.queryByText('Previous')).toBeFalsy();

    fireEvent.click(screen.getByText('Next'));

    expect(handleClick).toHaveBeenCalledOnce();
  })

  test('only Previous-button gets rendered on last page, clicking it calls the event handler', () => {

    const handleClick = vi.fn();

    render(<PaginationControls 
              page={4} 
              setPage={handleClick}
              isLastPage={true}
            />);
    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.queryByText('Next')).toBeFalsy();

    fireEvent.click(screen.getByText('Previous'));

    expect(handleClick).toHaveBeenCalledOnce();
  })

  test('Both buttons get rendered when it is not first or last page', () => {

    const handleClick = vi.fn();

    render(<PaginationControls 
              page={4} 
              setPage={handleClick}
              isLastPage={false}
            />);
    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.queryByText('Next')).toBeDefined();

  })
})