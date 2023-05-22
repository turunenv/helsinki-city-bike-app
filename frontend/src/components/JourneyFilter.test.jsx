import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import JourneyFilter from './JourneyFilter.jsx';

describe('JourneyFilter test', () => {
  test('should have label with test "Order by:"', () => {
    render(<JourneyFilter />);
    expect(screen.getByText('Order By:')).toBeDefined();
  })

  test('clicking on an input calls the correct state setter functions passed as props', () => {
    const setOrderBy = vi.fn();
    const setPage = vi.fn();
    const setBatchOffset = vi.fn();
  
    render(<JourneyFilter 
              orderBy='no-order'
              setOrderBy={setOrderBy}
              orderByDesc={false}
              setOrderByDesc={null}
              setBatchOffset={setBatchOffset}
              setPage={setPage}
            />)
  
    fireEvent.click(screen.getByLabelText('Departure time'))

    expect(setOrderBy).toHaveBeenCalledOnce();
    expect(setPage).toHaveBeenCalledOnce();
    expect(setBatchOffset).toHaveBeenCalledOnce();
  })

 
})