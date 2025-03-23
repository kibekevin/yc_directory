import React from 'react'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'


const SearchForm = ({ query }: { query?: string }) => {
    
  return (
    <form action="/" className='search-form'>
        <input type="text" name='query' defaultValue={query} className='search-input' placeholder='Search Startups' />

        <div className='flex gap-2'>
            {query && <SearchFormReset/>}

            <button type='submit' className='search-btn text-white'>
                <Search/>
            </button>

        </div>
    </form>
  )
}

export default SearchForm
