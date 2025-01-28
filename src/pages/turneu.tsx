import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { useContext, useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import axios from 'axios';
import { CircularProgress } from '@nextui-org/progress';
import { Button } from '@nextui-org/button';
import { useNavigate } from 'react-router-dom';
import AppContext from '@/contexts/context';
import { Link } from '@nextui-org/link';


const turneuPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("descending");
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("https://localhost:7011/api/Table");
      setTeams(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    };
    loadData();
  }, []);

  // Effect to handle sorting
  useEffect(() => {
    if (dataLoaded) {
      const sortTeams = () => {
        const sortedTeams = [...teams].sort((a, b) => {
          const first = a["points"];
          const second = b["points"];
    
          // Base comparison
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
          if (sortDirection === "descending") {
            cmp *= -1;
          }
    
          // Additional sorting rules
          if ( a.points === b.points ) {
            cmp = a.gd > b.gd ? -1 : a.gd < b.gd ? 1 : a.name.localeCompare(b.name);
          }
    
          return cmp;
        });
    
        // Update ranks after sorting
        const rankedTeams = sortedTeams.map((team, index) => ({
          ...team,
          rank: index + 1, // Add rank dynamically
        }));
    
        setTeams(rankedTeams); // Update state with sorted teams
        }
    
        sortTeams();
    }
    
  }, [dataLoaded, sortDirection]);

  
  const handleSort = () => {
    setSortDirection(sortDirection === "descending" ? "ascending" : "descending");
  };

  const navigate = useNavigate();
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error("Profile must be used within an AppContext.Provider");
  }
      
  const { setTeamCode } = context;

  const handleRowClick = (code: number) => {
    setTeamCode(code);
    navigate('/team');
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Basarab's Cup 2025</h1>

        <div className="max-w-4xl text-center justify-center mt-3">
          <div className='w-full flex flex-col gap-4 items-center justify-center'>
            <h3>Echipe înregistrate</h3>
            <div className="w-full">
            <Table
                aria-label="Team Rankings"
                onSortChange={handleSort}
                classNames={{
                  table: "min-h-[400px]",
                }}
            >
              <TableHeader>
                <TableColumn key="rank">
                  Rank
                </TableColumn>
                <TableColumn key="name">
                  Name
                </TableColumn>
                <TableColumn key="played">
                  Played
                </TableColumn>
                <TableColumn key="gd">
                  GD
                </TableColumn>
                <TableColumn key="points"  allowsSorting>
                  Points
                </TableColumn>
              </TableHeader>
              <TableBody 
                items={teams}
                isLoading={isLoading}
                loadingContent={<CircularProgress label="Loading..." />}
              >
                {(item: any) => (
                  <TableRow key={item.name} onClick={() => handleRowClick(item.id)} className="cursor-pointer">
                  <TableCell>{item.rank}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.played}</TableCell>
                  <TableCell>{item.gd}</TableCell>
                  <TableCell>{item.points}</TableCell>
                </TableRow>
                )}
              </TableBody>
            </Table>

            </div>
            
            <Link href='/teamRegister'>
              <Button>
                Înregistrează-ți echipa 
              </Button>
            </Link>

          </div>
        </div>

      </section>
    </DefaultLayout>
  )
}

export default turneuPage;